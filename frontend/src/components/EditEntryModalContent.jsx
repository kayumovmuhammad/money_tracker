import Select from "../ui-components/Select";
import Input from "../ui-components/Input";
import confirmData from "../data/confirmData";
import capitalizeFirstLatter from "../api/capitalizeFirstLatter";
import LabelLayout from "../ui-components/LabelLayout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function EditEntryModalContent({ formData, setFormData }) {
    const {
        register,
        watch,
        reset,
    } = useForm({
        defaultValues: {},
    });

    const [state, setState] = useState({});

    useEffect(() => {
        reset();
        setState({});
    }, []);


    useEffect(() => {
        const subscription = watch((value) => {
            setFormData((prev) => {return {...prev, ...value}});
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return <form className="flex flex-col gap-3">
        <div className="flex gap-3">
            <LabelLayout label="Payment type">
                <Select value={formData["type"]} {...register("type")}>
                    <option value="income">Income</option>
                    <option value="waste">Waste</option>
                </Select>
            </LabelLayout>
            <LabelLayout label="Payment type">
                <Select value={formData["payment_type"]} {...register("payment_type")}>
                    <option value="once">Once</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                </Select>
            </LabelLayout>

        </div>

        <div className="grid md:grid-cols-2 gap-3">
            {confirmData[formData.payment_type].map((item, index) => {
            if (item.inputType == "input") {
                return <Input value={formData[item.name]} key={index} {...register(item.name)} placeholder={capitalizeFirstLatter(item.name)} />
            } else if (item.inputType == "input:number") {
                return <div key={index} className="relative">
                    <Input value={formData[item.name]} {...register(item.name)} placeholder={capitalizeFirstLatter(item.name)}  type="number" />
                    <div className="absolute -top-2 left-3 bg-white text-[12px] text-black/70 px-1">
                    {capitalizeFirstLatter("Money amount")}
                    </div>
                </div>
            } else if (item.inputType == "input:day_of_month") {
                return <LabelLayout key={index} label={"Day of month"}>
                    <Select value={formData[item.name]} {...register(item.name)}>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                            <option key={day} value={(day < 10 ? "0" : "") + day}>{day}</option>
                        ))}
                    </Select>
                </LabelLayout>
            } else if (item.inputType == "input:weekday") {
                const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                return <Select value={formData[item.name]} key={index} {...register(item.name)}>
                {weekdays.map((day, index) => (
                    <option key={index} value={index.toString()}>{day}</option>
                ))}
                </Select>
            }
            })}
        </div>
        
        <div className="flex flex-col gap-3">
            <div className="bg-black/60 h-px relative mt-5 mb-1">
                <div className="text-black/70 absolute left-1/2 -translate-x-1/2 text-sm -translate-y-1/2 bg-white">Dates</div>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
            {
                confirmData[formData.payment_type].map((item, index) => {
                if (item.inputType == "input:date") {
                    let answer;
                    if (item.name == "day") {
                        answer = <Input value={formData[item.name]} {...register(item.name)} placeholder={item.name} type="date" />
                    } else {
                        answer = <Input value={formData[item.name]} {...register(item.name)} placeholder={item.name} type="date" />
                    }

                    return <LabelLayout key={index} label={item.name}>
                        {answer}
                    </LabelLayout>;
                }
                })
            } 
            </div>
        </div>
    </form>;
}