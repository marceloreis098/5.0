
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

// CAMPO DE IMAGEM EM BRANCO - ADICIONE SEU BASE64 AQUI
// CAMPO DE IMAGEM EM BRANCO - ADICIONE SEU BASE64 AQUI
const developerPhoto = "data:image/png;base64,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

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, pages, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div 
        className={`fixed lg:static inset-y-0 left-0 z-30 bg-white dark:bg-dark-card shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col
          ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-20'}
        `}
      >
        {/* Header da Sidebar */}
        <div className="h-20 flex items-center justify-center border-b dark:border-dark-border relative">
             {isSidebarOpen ? (
                <div className="flex items-center gap-2 px-4">
                    <Icon name="ShieldCheck" size={32} className="text-brand-primary" />
                    <h1 className="text-xl font-bold text-brand-dark dark:text-dark-text-primary whitespace-nowrap">Inventário Pro</h1>
                </div>
            ) : (
                 <Icon name="ShieldCheck" size={32} className="text-brand-primary" />
            )}
            
            {/* Botão para fechar no mobile */}
             <button 
                onClick={() => setIsSidebarOpen(false)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 lg:hidden text-gray-500"
            >
                <Icon name="X" size={24} />
            </button>
        </div>

        {/* Lista de Navegação */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-2">
            {pages.map((page) => {
                // Verifica se a página atual está na lista de páginas permitidas (segurança visual)
                if (!pages.includes(page)) return null;
                
                const isActive = activePage === page;
                return (
                  <li key={page}>
                    <button
                      onClick={() => {
                        setActivePage(page);
                        // Fecha sidebar no mobile ao clicar
                        if (window.innerWidth < 1024) setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200
                        ${isActive 
                          ? 'bg-brand-primary text-white shadow-md' 
                          : 'text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700'
                        }
                        ${!isSidebarOpen ? 'justify-center' : ''}
                      `}
                      title={!isSidebarOpen ? page : ''}
                    >
                      <Icon name={pageIcons[page]} size={24} />
                      {isSidebarOpen && (
                        <span className="ml-3 font-medium text-sm">{page}</span>
                      )}
                    </button>
                  </li>
                );
            })}
          </ul>
        </nav>

        {/* Rodapé com Info do Desenvolvedor */}
        <div className="border-t dark:border-dark-border p-4 bg-gray-50 dark:bg-dark-bg/50">
            <div className={`flex items-center gap-3 ${!isSidebarOpen ? 'justify-center' : ''}`}>
                <div className="relative group">
                    {/* Foto com efeito de Zoom */}
                    <img
                        src={developerPhoto}
                        alt="Dev"
                        className={`
                            w-10 h-10 rounded-full object-cover border-2 border-gray-300 dark:border-dark-border bg-gray-200
                            transition-transform duration-300 ease-out origin-bottom-left
                            hover:scale-[5] hover:z-50 hover:shadow-2xl cursor-pointer relative
                        `}
                    />
                </div>
                
                {isSidebarOpen && (
                    <div className="flex-1 min-w-0 overflow-hidden">
                        <p className="text-xs font-bold text-brand-secondary dark:text-dark-text-primary truncate" title="marcelo.reis@usereserva.com">
                            marcelo.reis@usereserva.com
                        </p>
                        <p className="text-[10px] text-gray-500 dark:text-dark-text-secondary truncate">
                            &copy; 2025 Dev: Marcelo Reis
                        </p>
                    </div>
                )}
            </div>
             {!isSidebarOpen && (
                <div className="mt-2 text-center">
                     <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-gray-400 hover:text-brand-primary transition-colors"
                     >
                        <Icon name="ChevronsRight" size={20} />
                     </button>
                </div>
            )}
        </div>
        
         {isSidebarOpen && (
             <button 
                onClick={() => setIsSidebarOpen(false)}
                className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white dark:bg-dark-border border border-gray-200 dark:border-gray-600 rounded-full p-1 shadow-md hidden lg:block text-gray-500 hover:text-brand-primary"
            >
                <Icon name="ChevronLeft" size={16} />
            </button>
         )}
      </div>
    </>
  );
};

export default Sidebar;
