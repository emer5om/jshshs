import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/joy";
import PhoneInput from "react-phone-input-2";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import OtpInput from "otp-input-react";
import { login } from "@/events/actions";
import firebaseConfig from "@/@core/firebase";
import {
  verify_user_firebase,
  verify_user,
  verify_otp,
  resend_otp,
} from "@/interceptor/routes";
import "react-phone-input-2/lib/material.css";
import { RiArrowLeftLine, RiTimer2Line } from "@remixicon/react";
import RegisterModal from "./RegisterModal";
import { useTranslation } from "react-i18next";

export default function LoginModal({ loginModalState, onClose }) {
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE;
  const [state, setState] = useState({
    phoneNumber: demoMode == "true" ? "+919876543210" : "",
    isLoading: false,
    isOTPLoading: false,
    OTPReset: false,
    otp: demoMode == "true" ? "123456" : "",
    resendDisabled: false,
    resendTime: 0,
    openRegisterModal: false,
    sendOtp: false,
    verifyOtp: false,
  });

  const { t } = useTranslation();
  const countryCode = process.env.NEXT_PUBLIC_COUNTRY_CODE;
  const firebase = firebaseConfig();

  const Auth = useSelector((state) => state.authentication);

  const Authentication_mode = useSelector(
    (state) => state?.settings?.value?.authentication_mode
  );

  const theme = useTheme();

  useEffect(() => {
    window.recaptchaVerifier = new firebase.firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      }
    );
  }, [firebase.firebase.auth]);

  const handleSendOTPFirebase = useCallback(async () => {
    if (!state.phoneNumber) {
      toast.error(t("please-enter-your-number"));
      return;
    }

    setState((prevState) => ({
      ...prevState,
      sendOtp: true,
    }));

    try {
      const confirmationResult = await firebase.auth.signInWithPhoneNumber(
        `+${state.phoneNumber}`,
        window.recaptchaVerifier
      );
      if (confirmationResult) {
        toast.success(t("otp-sent-successfully"));
        window.confirmationResult = confirmationResult;
        setState((prevState) => ({
          ...prevState,
          sendOtp: false,
          isLoading: true,
        }));
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        sendOtp: false,
      }));
      toast.error(error.message);
    }
  }, [state.phoneNumber, firebase.auth, t]);

  const handleSendOTP = useCallback(async () => {
    if (!state.phoneNumber) {
      toast.error(t("please-enter-your-number"));
      return;
    }

    setState((prevState) => ({
      ...prevState,
      sendOtp: true,
    }));

    try {
      // Replace this block with your own API call to send OTP
      const response = await verify_user({ mobile: state.phoneNumber });

      const data = await response;

      console.log(data);

      if (!response.error) {
        // Assume your backend returns a success message
        toast.success(t("otp-sent-successfully"));
        // Save some identifier for the OTP verification
        // For example, if your backend returns an OTP session ID, save it in state
        setState((prevState) => ({
          ...prevState,
          otpSessionId: data.otpSessionId, // Adjust according to your backend response
          sendOtp: false,
          isLoading: true,
        }));
      } else {
        // Handle backend errors
        toast.error(data.error);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          sendOtp: false,
        }));
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        sendOtp: false,
      }));
      toast.error(error.message);
    }
  }, [state.phoneNumber, t]);

  useEffect(() => {
    let interval;
    if (state.resendDisabled) {
      interval = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          resendTime: prevState.resendTime - 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.resendDisabled]);

  const handleResendOTPFirebase = useCallback(async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        resendDisabled: true,
        resendTime: 30,
      }));
      const appVerifier = window.recaptchaVerifier;

      window.confirmationResult = null;

      const confirmationResult = await firebase.auth.signInWithPhoneNumber(
        `+${state.phoneNumber}`,
        appVerifier
      );

      window.confirmationResult = confirmationResult;

      setTimeout(() => {
        setState((prevState) => ({ ...prevState, resendDisabled: false }));
      }, 30000);
    } catch (error) {
      toast.error(error.message);
      setState((prevState) => ({ ...prevState, resendDisabled: false }));
    }
  }, [state.phoneNumber, firebase.auth]);

  const handleResendOTP = useCallback(async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        resendDisabled: true,
        resendTime: 30,
      }));

      const response = await resend_otp({ mobile: state.phoneNumber });

      const data = await response;

      if (!response.error) {
        setTimeout(() => {
          setState((prevState) => ({ ...prevState, resendDisabled: false }));
        }, 30000);
      } else {
        toast.error(data.error);
        setState((prevState) => ({ ...prevState, resendDisabled: false }));
      }
    } catch (error) {
      toast.error(error.message);
      setState((prevState) => ({ ...prevState, resendDisabled: false }));
    }
  }, [state.phoneNumber]);

  const verifyUserFirebase = useCallback(async () => {
    try {
      const number = state.phoneNumber.slice(2);
      const verify = await verify_user_firebase({ mobile: number });
      return verify;
    } catch (error) {
      console.error("Verify User Error:", error);
      return { error: true };
    }
  }, [state.phoneNumber]);

  const handleOTPVerificationFirebase = useCallback(async () => {
    if (!state.otp) {
      toast.error(t("please-enter-verification-code"));
      return;
    }

    setState((prevState) => ({ ...prevState, verifyOtp: true }));
    const number = state.phoneNumber.slice(2);

    try {
      await window.confirmationResult.confirm(state.otp);

      const verify = await verifyUserFirebase();

      if (verify && verify.error) {
        window.recaptchaVerifier.render().then((widgetId) => {
          grecaptcha.reset(widgetId);
        });

        setState((prevState) => ({
          ...prevState,
          openRegisterModal: true,
          verifyOtp: false,
        }));

        toast.error(t("failed-to-verify-otp"));
      } else {
        const userLogin = await login({ phoneNumber: number });


        if (userLogin?.error || userLogin?.data?.error) {
          setState((prevState) => ({
            ...prevState,
            openRegisterModal: true,
            verifyOtp: false,
          }));
          toast.error(userLogin?.data?.message);
        } else {
          toast.success("Login Successfully");
          onClose();
        }
      }
    } catch (err) {
      setState((prevState) => ({ ...prevState, verifyOtp: false }));
      toast.error(t("failed-to-verify-otp"));
    }
  }, [state.otp, state.phoneNumber, verifyUserFirebase, onClose, login, t]);

  const handleOTPVerification = useCallback(async () => {

    if (!state.otp) {
      toast.error(t("please-enter-verification-code"));
      return;
    }

    setState((prevState) => ({ ...prevState, verifyOtp: true }));
    const number = state.phoneNumber.slice(2);

    try {
      // Send OTP and phone number to your backend API for verification
      const response = await verify_otp({
        mobile: state.phoneNumber,
        otp: state.otp,
      });

      const data = await response;

      if (!response.error) {
        if (!response.error) {
          const userLogin = await login({ phoneNumber: number });

          if (userLogin?.error || userLogin?.data?.error) {
            toast.error(userLogin?.error ? "" : userLogin?.data?.message);

            setState((prevState) => ({
              ...prevState,
              openRegisterModal: true,
              verifyOtp: false,
            }));
          } else {
            // toast.success(userLogin.message);
            toast.success("Login Successfully");
            onClose();
          }
        } else {
          // Handle case where user is not verified
          // window.recaptchaVerifier.render().then((widgetId) => {
          //   grecaptcha.reset(widgetId);
          // });
        }
      } else {
        // Handle backend errors
        setState((prevState) => ({
          ...prevState,
          verifyOtp: false,
        }));

        toast.error(data?.message);
      }
    } catch (err) {
      console.log(err);
      setState((prevState) => ({ ...prevState, verifyOtp: false }));
      // toast.error(t("failed-to-verify-otp"));
    }
  }, [state.otp, state.phoneNumber, onClose, login, t]);

  return (
    <Box>
      <div id="sign-in-button"></div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={loginModalState}
        onClose={onClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ModalDialog
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={loginModalState}
          onClose={onClose}
          size="lg"
          sx={{ minWidth: { xs: "90%", sm: "70%", md: 500 } }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          {!state.isLoading ? (
            <>
              <Typography fontSize="xl" fontWeight="lg" mb={1}>
                {t("please-log-in-to-continue")}
              </Typography>
              <Box py={2} display="flex" flexDirection="column" gap={2}>
                <PhoneInput
                  country={countryCode}
                  inputClass="generalClass"
                  placeholder={t("enter-phone-number")}
                  value={state.phoneNumber}
                  inputStyle={{
                    width: "100%",
                    height: "45px",
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? theme.palette.primary[50]
                        : "#3B3B3B",
                  }}
                  onChange={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      phoneNumber: value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      Authentication_mode
                        ? handleSendOTP()
                        : handleSendOTPFirebase();
                    }
                  }}
                />

                <Button
                  variant="solid"
                  color="primary"
                  fullWidth
                  onClick={
                    Authentication_mode ? handleSendOTP : handleSendOTPFirebase
                  }
                  sx={{
                    borderRadius: "20px",
                  }}
                  disabled={state.sendOtp}
                >
                  {state.sendOtp ? t("loading") : t("login")}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography fontSize="xl" fontWeight="lg" mb={1}>
                {t("Enter-OTP")}
              </Typography>
              <Box
                py={2}
                mb={1}
                display="flex"
                alignItems="center"
                flexDirection="column"
                gap={2}
                style={{ maxWidth: "100%", overflowX: "auto" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    Authentication_mode
                      ? handleOTPVerification()
                      : handleOTPVerificationFirebase();
                  }
                }}
              >
                <OtpInput
                  value={state.otp}
                  onChange={(value) =>
                    setState((prevState) => ({ ...prevState, otp: value }))
                  }
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus={true}
                  className="otp-container"
                />
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={1}
              >
                <Button
                  variant="outlined"
                  color="warning"
                  sx={{ width: { xs: "25%", md: "33%" } }}
                  onClick={() => {
                    if (window.recaptchaVerifier) {
                      window.recaptchaVerifier.render().then((widgetId) => {
                        grecaptcha.reset(widgetId);
                      });
                    }

                    setState((prevState) => ({
                      ...prevState,
                      isLoading: false,
                      otp: "",
                      isOTPLoading: false,
                    }));
                  }}
                  startDecorator={<RiArrowLeftLine />}
                >
                  {t("go-Back")}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={
                    Authentication_mode
                      ? handleResendOTP
                      : handleResendOTPFirebase
                  }
                  disabled={state.isOTPLoading || state.resendDisabled}
                  startDecorator={state.resendDisabled && <RiTimer2Line />}
                >
                  {t("resend-otp")}{" "}
                  {state.resendDisabled && `in ${state.resendTime} seconds`}
                </Button>
                <Button
                  variant="solid"
                  color="primary"
                  sx={{ width: "33%" }}
                  onClick={
                    Authentication_mode
                      ? handleOTPVerification
                      : handleOTPVerificationFirebase
                  }
                  disabled={state.verifyOtp}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      Authentication_mode
                        ? handleOTPVerification()
                        : handleOTPVerificationFirebase();
                    }
                  }}
                >
                  {state.verifyOtp ? t("loading") : t("verify")}
                </Button>
              </Box>
            </>
          )}
        </ModalDialog>
      </Modal>

      {state.openRegisterModal && (
        <RegisterModal
          openRegisterModal={state.openRegisterModal}
          setOpenRegisterModal={(value) =>
            setState((prevState) => ({
              ...prevState,
              openRegisterModal: value,
            }))
          }
          mobile={state.phoneNumber}
        />
      )}
    </Box>
  );
}
