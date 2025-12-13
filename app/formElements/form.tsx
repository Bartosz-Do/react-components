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
                <TextInput name='text' colors={[color1, color2]} value={text1} labelValue="enter text" required={true} stateSetter={setText1} image={{viewBox: '23.060344 10.772654 68.487137 68.487289', path: 'm 66.547095,10.772654 a 25,25 0 0 0 -17.677474,7.32255 25,25 0 0 0 -2.300635,32.706014 l -23.508642,23.508643 4.949568,4.950085 23.508643,-23.508643 a 25,25 0 0 0 32.706531,-2.300634 25,25 0 0 0 0,-35.355465 25,25 0 0 0 -17.677991,-7.32255 z m 0,5.000211 a 20,20 0 0 1 14.142289,5.858041 20,20 0 0 1 0,28.284062 20,20 0 0 1 -28.284062,0 20,20 0 0 1 1e-6,-28.284062 20,20 0 0 1 14.141772,-5.858041 z'}} />
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