'use client';

import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';

const LayoutCSR = ({ children }: { children: React.ReactNode }) => {
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(
    window.matchMedia('(max-width: 768px)').matches
  );

  const clickHandler = () => {
    setToggled(false);
  };

  return (
    <>
      <main className="w-full overscroll-none">
        <Navbar />
        <div className="flex">
          <Sidebar
            width="10.625rem"
            customBreakPoint="768px"
            onBreakPoint={setBroken}
            onBackdropClick={() => setToggled(false)}
            toggled={toggled}
            className="text-white bg-red-800 top-[84px] h-[calc(100vh_-_5rem)] md:!sticky !border-r-0"
          >
            <Menu closeOnClick>
              <MenuItem onClick={clickHandler} component={<Link href="/" />}>
                {' '}
                Dashboard
              </MenuItem>
              <MenuItem
                onClick={clickHandler}
                component={<Link href="/tickets" />}
              >
                Tickets
              </MenuItem>
              <MenuItem
                onClick={clickHandler}
                component={<Link href="/roles" />}
              >
                Roles
              </MenuItem>
              <MenuItem onClick={clickHandler}>Calendar</MenuItem>
            </Menu>
          </Sidebar>
          <div className="flex-[1_1_100%] min-w-0">
            <div
              id="content"
              className="min-h-[76vh] p-7 mx-auto overscroll-none"
            >
              {broken ? (
                <div>
                  <Button
                    className="p-0"
                    onClick={() => setToggled((prev) => !prev)}
                    variant="ghost"
                  >
                    <MenuIcon />
                  </Button>
                </div>
              ) : null}
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LayoutCSR;
