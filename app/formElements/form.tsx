'use client'
import { useState } from 'react';
import { Form, TextInput, SubmitButton, NumberInput, ColorInput, DateInput } from '../components/FormElements';

export default function PrevievForm() {
    const [text1, setText1] = useState<string>('');
    const [text2, setText2] = useState<string>('');
    const [color1, setColor1] = useState<string>('#121212');
    const [color2, setColor2] = useState<string>('#F8F9F5');
    const [color3, setColor3] = useState<string>('');
    const [date, setDate] = useState<string>('2000-01-01');

    return (
        <div className="center">
            <Form colors={[color1, color2]} method='POST'>
                <TextInput name='text' colors={[color1, color2]} value={text1} labelValue="enter text" required={true} stateSetter={setText1} />
                <NumberInput negative={true} float={true} name='number' colors={[color1, color2]} value={text2} labelValue="enter number" required={false} stateSetter={setText2} />
                <ColorInput colors={[color1, color2]} value={color1} labelValue='first color' stateSetter={setColor1} />
                <ColorInput colors={[color1, color2]} value={color2} labelValue='second color' stateSetter={setColor2} />
                <ColorInput colors={[color1, color2]} value={color3} labelValue='random color input' stateSetter={setColor3} />
                
                <DateInput value={date} stateSetter={setDate} labelValue='Select date' colors={[color1, color2, 'gray']} />
                <SubmitButton colors={[color1, color2]}>Submit</SubmitButton>
            </Form>
        </div>
    );
}