import React from 'react';
import { Avatar, FormLabel, Radio, RadioGroup, Sheet, radioClasses } from '@mui/joy';
import { RiCheckLine } from '@remixicon/react';

const AddressRadioGroup = ({ addresses, onChange }) => {
    return (
        <RadioGroup
            aria-label="address-type"
            name="address-type"
            defaultValue={addresses[0].type}
            onChange={onChange}
            sx={{
                flexDirection: 'row',
                gap: 2,
                [`& .${radioClasses.checked}`]: {
                    [`& .${radioClasses.action}`]: {
                        inset: -1,
                        border: '3px solid',
                        borderColor: 'primary.500',
                    },
                },
                [`& .${radioClasses.radio}`]: {
                    display: 'contents',
                    '& > svg': {
                        zIndex: 2,
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        bgcolor: 'background.surface',
                        borderRadius: '50%',
                    },
                },
            }}
        >
            {addresses.map((address) => (
                <Sheet
                    key={address.id}
                    variant="outlined"
                    sx={{
                        borderRadius: 'md',
                        boxShadow: 'sm',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 2,
                        minWidth: 120,
                    }}
                >
                    <Radio value={address.type} checkedIcon={<RiCheckLine />} />
                    <Avatar variant="soft" size="sm" />
                    <FormLabel htmlFor={address.type}>{address.type}</FormLabel>
                </Sheet>
            ))}
        </RadioGroup>
    );
};

export default AddressRadioGroup;