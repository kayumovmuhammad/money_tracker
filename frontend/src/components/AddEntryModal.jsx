import React, { useState } from "react";
import Button from "../ui-components/Button";
import Input from "../ui-components/Input";
import useAuth from "../contexts/AuthContext";
import axios from "axios";
import useTransactions from "../contexts/TransactionsContext";
import EditEntryModalContent from "./EditEntryModalContent";
import ModalElement from "./ModalElement";

export default function AddEntryModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const { loadTransactions } = useTransactions();
  const [step, setStep] = useState("input");
  const [rawInput, setRawInput] = useState("");
  const [formData, setFormData] = useState({
    user_description: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const processAI = () => {
    setIsProcessing(true);
    setError(null);
    axios.post(`${import.meta.env.VITE_API_URL}/transaction/annotate`, {user_description: rawInput}, {headers: {"Authorization": `Bearer ${user.accessToken}`, "Content-Type": "application/json", "accept": "application/json", }}).then((res) => {
      setFormData({ ...res.data.transaction, user_description: rawInput });
      setStep("confirm");
      setIsProcessing(false);
    }).catch(err => {
      setError(err.response.data.detail);
      setIsProcessing(false); 
    })
  };


  const handleConfirm = () => {
    axios.post(`${import.meta.env.VITE_API_URL}/transaction/create`, formData, {headers: {"Authorization": `Bearer ${user.accessToken}`, "Content-Type": "application/json", "accept": "application/json", }}).then((res) => {
      loadTransactions(user.accessToken);
      handleClose();
    })
  };

  const handleClose = () => {
    onClose();
    setStep("input");
    setRawInput("");
  };

  return (
    <ModalElement isOpen={isOpen} onClose={handleClose}>
        <h2 className="font-extrabold text-2xl mb-1.5">AI Transaction Note</h2>
        <p className="text-text-sub text-[0.85rem] mb-5">
          Describe your transaction naturally.
        </p>

        {step == "input" && <div className="flex flex-col gap-3">
            <Input
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="e.g. 'Coffee 5 dollars' or 'Salary 3000'"
              className="p-3.75 rounded-xl text-[1rem]"
            />
            {error && <p className="text-red-500 text-[0.75rem]">{`*${error}`}</p>}
            <Button isLoading={isProcessing} onClick={processAI} className="w-full p-3.5">
              Analyze & Continue
            </Button>
          </div>}
        {step == "confirm" && <div className="flex flex-col gap-3">
            <EditEntryModalContent formData={formData} setFormData={setFormData} />

            <div className="flex gap-2 justify-end">
              <Button onClick={handleClose} variant="secondary" className="w-30 h-10">Cancel</Button>
              <Button onClick={handleConfirm} variant="primary" className="w-30 h-10">Save</Button>
            </div>
          </div>
        }
    </ModalElement>
  );
}
