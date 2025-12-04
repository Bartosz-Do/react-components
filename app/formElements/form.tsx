'use client'
import { useState, useEffect } from 'react';
import { Form, TextInput, SubmitButton, NumberInput, ColorInput, DateInput } from '../components/FormElements';

function checkNumber(text: string): boolean {
    if (text === '') return true;
    return /^\d+$/.test(text);
}

export default function PrevievForm() {
    //const [inputValue, setInputValue] = useState<any[]>(['', '', '']);
    const [text1, setText1] = useState<string>('');
    const [text2, setText2] = useState<string>('');
    const [colors, setColors] = useState<string[]>(['#121212', '#F8F9F5', '#000000']);
    const [date, setDate] = useState<string>('2000-01-01');

    return (
        <div className="center">
            <Form colors={[colors[0], colors[1]]}>
                <TextInput name='text' colors={[colors[0], colors[1]]} value={text1} labelValue="enter text" required={true} stateSetter={setText1} />
                <NumberInput negative={true} float={true} name='number' colors={[colors[0], colors[1]]} value={text2} labelValue="enter number" required={false} stateSetter={setText2} />
                <ColorInput colors={[colors[0], colors[1]]} value={colors[0]} labelValue='first color' onChange={(e: any) => setColors(prev => {let newColors = [...prev]; newColors[0] = e.target.value; return newColors;})} />
                <ColorInput colors={[colors[0], colors[1]]} value={colors[1]} labelValue='second color' onChange={(e: any) => setColors(prev => {let newColors = [...prev]; newColors[1] = e.target.value; return newColors;})} />
                <ColorInput colors={[colors[0], colors[1]]} value={colors[2]} labelValue='random color input' onChange={(e: any) => setColors(prev => {let newColors = [...prev]; newColors[2] = e.target.value; return newColors;})} />
                
                <DateInput value={date} stateSetter={setDate} labelValue='Select date' colors={[colors[0], colors[1], 'gray']} />
                <SubmitButton colors={[colors[0], colors[1]]}>Submit</SubmitButton>
            </Form>
        </div>
    )
}