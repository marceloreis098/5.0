
import React from 'react';
import { Page } from '../types';
import Icon from './common/Icon';
import { icons } from 'lucide-react';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  pages: Page[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const pageIcons: { [key in Page]: keyof typeof icons } = {
    'Dashboard': 'LayoutDashboard',
    'Inventário de Equipamentos': 'Computer',
    'Controle de Licenças': 'ScrollText',
    'Usuários e Permissões': 'Users',
    'Configurações': 'Settings',
    'Auditoria': 'History',
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, pages, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-dark-card shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-center h-20 border-b dark:border-dark-border">
           <div className="flex items-center gap-2 text-brand-primary">
               <Icon name="ShieldCheck" size={32} />
               <h1 className="text-xl font-bold text-brand-dark dark:text-dark-text-primary">Inventário Pro</h1>
           </div>
        </div>
        <nav className="mt-6">
          <ul>
            {pages.map((page) => (
              <li key={page}>
                <button
                  onClick={() => {
                    setActivePage(page);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                    activePage === page
                      ? 'bg-brand-light dark:bg-gray-700 text-brand-primary border-r-4 border-brand-primary'
                      : 'text-gray-600 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-dark-text-primary'
                  }`}
                >
                  <Icon name={pageIcons[page]} size={20} className="mr-3" />
                  <span className="font-medium">{page}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t dark:border-dark-border">
             <div className="flex items-center justify-center text-xs text-gray-400 dark:text-gray-600">
                <span>v1.0.0</span>
             </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
