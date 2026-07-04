import React from 'react';
import { motion } from 'motion/react';
import { Menu, ShieldAlert, Star } from 'lucide-react';
import Button from '../common/Button';

interface NavbarProps {
  webTitle: string;
  onOpenSidebar: () => void;
  isAdminMode: boolean;
  onToggleAdmin: () => void;
}

export default function Navbar({
  webTitle,
  onOpenSidebar,
  isAdminMode,
  onToggleAdmin,
}: NavbarProps) {
  return (
    <header className="bg-white border-b-4 border-black sticky top-0 z-[100] px-4 py-3 shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="accent"
            size="sm"
            onClick={onOpenSidebar}
            className="rounded-lg"
          >
            <Menu className="w-4 h-4 text-black" />
          </Button>
          <motion.h1
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="font-syne font-black text-xl sm:text-2xl tracking-tight text-black flex items-center gap-1 cursor-pointer"
          >
            <span className="text-[#FFD100] bg-black px-2.5 py-1 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {webTitle}
            </span>
          </motion.h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isAdminMode ? 'yellow' : 'white'}
            size="sm"
            onClick={onToggleAdmin}
            className="text-[10px]"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{isAdminMode ? 'Admin Panel' : 'Masuk Admin'}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
