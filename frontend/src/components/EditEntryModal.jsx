import React, { useEffect, useState } from "react";
import Button from "../ui-components/Button";
import Input from "../ui-components/Input";
import useAuth from "../contexts/AuthContext";
import axios from "axios";
import useTransactions from "../contexts/TransactionsContext";
import EditEntryModalContent from "./EditEntryModalContent";
import ModalElement from "./ModalElement";
import useModalStore from "../contexts/ModalContext";
import { useForm } from "react-hook-form";

export default function EditEntryModal() {
  const { user } = useAuth();
  const { loadTransactions } = useTransactions();
  const { currentTransaction } = useModalStore();
  const [formData, setFormData] = useState(null); 
  const { isEditModalOpen, setEditModalOpen } = useModalStore();
  
  useEffect(() => {
    setFormData(currentTransaction);
  }, [currentTransaction]);

  if (!isEditModalOpen) return null;
  if (!formData) return null;

  const handleSave = () => {
    axios.patch(`${import.meta.env.VITE_API_URL}/transaction/update`, formData, {headers: {"Authorization": `Bearer ${user.accessToken}`, "Content-Type": "application/json", "accept": "application/json", }}).then((res) => {
      loadTransactions(user.accessToken);
      handleClose();
    })
  };

  const handleClose = () => {
    setEditModalOpen(false);
  };

  const handleDelete = () => {
    axios.delete(`${import.meta.env.VITE_API_URL}/transaction/delete/${formData.id}`, {headers: {"Authorization": `Bearer ${user.accessToken}`, "Content-Type": "application/json", "accept": "application/json", }}).then((res) => {
      loadTransactions(user.accessToken);
      handleClose();
    })
  };

  return (
    <ModalElement isOpen={isEditModalOpen} onClose={handleClose}>
        <h2 className="font-extrabold text-2xl mb-1.5">Edit transaction</h2>
        <p className="text-text-sub text-[0.85rem] mb-5">
          Edit your transaction naturally.
        </p>
        <div className="flex flex-col gap-3">
            <EditEntryModalContent formData={formData} setFormData={setFormData} />

            <div className="flex gap-2 justify-end">
                <Button onClick={handleDelete} variant="danger" className="w-30 h-10">Delete</Button>
                <Button onClick={handleClose} variant="secondary" className="w-30 h-10">Cancel</Button>
                <Button onClick={handleSave} variant="primary" className="w-30 h-10">Save</Button>
            </div>
        </div>
    </ModalElement>
  );
}
