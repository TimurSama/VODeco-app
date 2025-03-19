import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Link, useLocation } from 'react-router-dom'
import { menuItems } from '../../data/menuItems'

interface MenuItem {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: {
    id: string;
    title: string;
    items: MenuItem[];
  }[];
}

export default function Drawer({ isOpen, onClose, menuItems }: DrawerProps) {
  const location = useLocation();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-deep-blue/95 shadow-xl">
                    <div className="px-4 sm:px-6 py-6 glass">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-2xl font-semibold neon-text">
                          VODeco
                        </Dialog.Title>
                        <button
                          type="button"
                          className="rounded-md text-gray-400 hover:text-white focus:outline-none"
                          onClick={onClose}
                        >
                          <span className="sr-only">Закрыть меню</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="relative flex-1 px-4 sm:px-6 overflow-y-auto">
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div className="h-full divide-y divide-gray-700/50">
                          {menuItems.map((section) => (
                            <div key={section.id} className="py-6">
                              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                {section.title}
                              </h3>
                              <div className="space-y-2">
                                {section.items.map((item) => {
                                  const isActive = location.pathname === item.href;
                                  return (
                                    <Link
                                      key={item.id}
                                      to={item.href}
                                      className={`group flex items-center px-3 py-2 text-base font-medium rounded-md transition-all duration-200 ${
                                        isActive
                                          ? 'text-white bg-primary/20 neon-border'
                                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                                      }`}
                                      onClick={onClose}
                                    >
                                      <item.icon
                                        className={`mr-4 h-6 w-6 flex-shrink-0 transition-colors duration-200 ${
                                          isActive
                                            ? 'text-primary'
                                            : 'text-gray-400 group-hover:text-white'
                                        }`}
                                        aria-hidden="true"
                                      />
                                      {item.name}
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 