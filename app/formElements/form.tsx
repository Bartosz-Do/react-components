'use client'
import { useState, useEffect } from 'react';
import { Form, Input, SubmitButton, ColorInput, DateInput } from '../components/FormElements';

function checkNumber(text: string): boolean {
    if (text === '') return true;
    return /^\d+$/.test(text);
}

export default function PrevievForm() {
    const [inputValue, setInputValue] = useState<any[]>(['', '', '']);
    const [colors, setColors] = useState<string[]>(['#121212', '#F8F9F5', '#000000']);
    const [date, setDate] = useState<string>(() => {
        let currentDate = new Date();
        return `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`
    });

    return (
        <div className="center">
            <Form colors={[colors[0], colors[1]]}>
                <Input name='text' colors={[colors[0], colors[1]]} value={inputValue[0]} labelValue="enter text" required={true} onChange={(e: any) => setInputValue(prev => {let newArray = [...prev]; newArray[0] = e.target.value; return newArray;})} />
                <Input name='number' colors={[colors[0], colors[1]]} value={inputValue[1]} labelValue="enter number" required={false} onChange={(e: any) => setInputValue(prev => {let newArray = [...prev]; newArray[1] = checkNumber(e.target.value.toString()) ? e.target.value : newArray[1]; return newArray;})} />
                <ColorInput colors={[colors[0], colors[1]]} value={colors[0]} labelValue='first color' onChange={(e: any) => setColors(prev => {let newColors = [...prev]; newColors[0] = e.target.value; return newColors;})} />
                <ColorInput colors={[colors[0], colors[1]]} value={colors[1]} labelValue='second color' onChange={(e: any) => setColors(prev => {let newColors = [...prev]; newColors[1] = e.target.value; return newColors;})} />
                <ColorInput colors={[colors[0], colors[1]]} value={colors[2]} labelValue='random color input' onChange={(e: any) => setColors(prev => {let newColors = [...prev]; newColors[2] = e.target.value; return newColors;})} />
                
                <DateInput value={date} stateSetter={setDate} labelValue='Select date' colors={[colors[0], colors[1], 'gray']} />
                <SubmitButton colors={[colors[0], colors[1]]}>Submit</SubmitButton>
            </Form>
        </div>
    )
}