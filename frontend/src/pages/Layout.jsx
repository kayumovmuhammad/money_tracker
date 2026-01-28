import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import Header from "../components/Header";
import AddEntryModal from "../components/AddEntryModal";
import EditEntryModal from "../components/EditEntryModal";
import useModalStore from "../contexts/ModalContext";

export default function Layout({ children }) {
  const { isAddModalOpen, setAddModalOpen } = useModalStore();
  return (
    <div className="bg-bg text-text h-screen overflow-hidden flex">
      {/* Sidebar - Desktop */}
      <Sidebar onAddEntry={() => setAddModalOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Header />

        <div className="p-5 overflow-y-auto pb-25 md:p-10">
          {<children.element />}
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav onAddEntry={() => setAddModalOpen(true)} />

      {/* AI Modal */}
      <AddEntryModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
      {/* Edit Modal */}
      <EditEntryModal />
    </div>
  );
}
