import React, { useState, useRef } from 'react';
import {  MenuItem, List, ListItem, Sheet, MenuButton, Dropdown, } from '@mui/joy';
import Menu, { menuClasses } from '@mui/joy/Menu';
import { Apps, Settings, Person } from '@mui/icons-material';

const NavMenuButton = ({
    children,
    menu,
    open,
    onOpen,
    onLeaveMenu,
    label,
    ...props
}) => {
    const isOnButton = useRef(false);
    const internalOpen = React.useRef(open);
    const handleButtonKeyDown = (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            onOpen(event);
        }
    };


    const modifiers = [
        {
          name: 'offset',
          options: {
            offset: ({ placement }) => {
              if (placement.includes('end')) {
                return [8, 20];
              }
              return [-8, 20];
            },
          },
        },
      ];

    return (
        <Dropdown
            open={open}
            onOpenChange={(_, isOpen) => {
                if (isOpen) {
                    onOpen?.();
                }
            }}
        >
            <MenuButton
                {...props}
                slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                onMouseDown={() => {
                    internalOpen.current = open;
                }}
                onClick={() => {
                    if (!internalOpen.current) {
                        onOpen();
                    }
                }}
                onMouseEnter={() => {
                    onOpen();
                    isOnButton.current = true;
                }}
                onMouseLeave={() => {
                    isOnButton.current = false;
                }}
                onKeyDown={handleButtonKeyDown}
                sx={{
                    bgcolor: open ? 'neutral.plainHoverBg' : undefined,
                    border: "none",
                    "&:hover": {
                        backgroundColor: "transparent",
                    },
                }}
            >
                {children}
            </MenuButton>
            {React.cloneElement(menu, {
                onMouseLeave: () => {
                    onLeaveMenu(() => isOnButton.current);
                },
                // modifiers,
                slotProps: {
                    listbox: {
                        id: `nav-example-menu-${label}`,
                        'aria-label': label,
                    },
                },
                placement: "bottom-start",
                sx: {
                    width: "40%",
                    height: "200px",
                    overFlow: "hidden",
                    [`& .${menuClasses.listbox}`]: {
                        '--List-padding': 'var(--ListDivider-gap)',
                    },
                },
            })}
        </Dropdown>
    );
};

export default NavMenuButton