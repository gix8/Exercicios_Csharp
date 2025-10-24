import React from 'react';
import { Button } from "./ui/button";

interface HeaderProps {
  activeTab: 'list' | 'register';
  onTabChange: (tab: 'list' | 'register') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-r from-background via-background/90 to-background backdrop-blur">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <h1 className="text-2xl font-bold tracking-wider text-primary">
            E-COMMERCE
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button
              variant={activeTab === 'list' ? 'gradient' : 'ghost'}
              onClick={() => onTabChange('list')}
              className="font-semibold transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
            >
              Produtos
            </Button>
            <Button
              variant={activeTab === 'register' ? 'gradient' : 'ghost'}
              onClick={() => onTabChange('register')}
              className="font-semibold transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
            >
              Cadastrar
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};