'use client'
import { useState } from 'react';
import { Form, TextInput, SubmitButton, NumberInput, ColorInput, DateInput } from '../components/FormElements';

export default function PrevievForm() {
    const [text1, setText1] = useState<string>('');
    const [text2, setText2] = useState<string>('');
    const [text3, setText3] = useState<string>('');
    const [color1, setColor1] = useState<string>('#121212');
    const [color2, setColor2] = useState<string>('#F8F9F5');
    const [color3, setColor3] = useState<string>('');
    const [date, setDate] = useState<string>('2000-01-01');

    return (
        <div className="center">
            <Form colors={[color1, color2]} method='POST'>
                <TextInput name='text' colors={[color1, color2]} value={text1} labelValue="text input with image" required={true} stateSetter={setText1} image={{viewBox: '10.560344 -24.227346 84.999993 84.999999', path: 'M 53.060592 -24.227346 L 10.560344 18.199005 L 14.102247 21.734706 L 23.060356 12.7921 L 23.060356 15.772796 L 23.060356 60.772634 L 28.060568 60.772634 L 43.060169 60.772634 L 45.560275 60.772634 L 45.560275 35.772609 L 60.560393 35.772609 L 60.560393 60.772634 L 65.560088 60.772634 L 83.060311 60.772634 L 83.060311 55.772422 L 83.060311 12.7921 L 92.018421 21.734706 L 95.560324 18.199005 L 53.060592 -24.227346 z M 53.060592 -17.155943 L 81.037179 10.772585 L 28.060568 10.772585 L 25.083489 10.772585 L 53.060592 -17.155943 z M 28.060568 15.772796 L 78.0601 15.772796 L 78.0601 55.772422 L 65.560088 55.772422 L 65.560088 35.772609 L 65.560088 30.772398 L 40.56058 30.772398 L 40.56058 35.772609 L 40.56058 55.772422 L 28.060568 55.772422 L 28.060568 15.772796 z '}} />
                <TextInput value={text2} colors={[color1, color2]} labelValue='normal text input' stateSetter={setText2} />
                <NumberInput negative={true} float={true} name='number' colors={[color1, color2]} value={text3} labelValue="enter number" required={false} stateSetter={setText3} />
                <ColorInput colors={[color1, color2]} value={color1} labelValue='first color' stateSetter={setColor1} />
                <ColorInput colors={[color1, color2]} value={color2} labelValue='second color' stateSetter={setColor2} />
                <ColorInput colors={[color1, color2]} value={color3} labelValue='random color input' stateSetter={setColor3} />
                
                <DateInput value={date} stateSetter={setDate} labelValue='Select date' colors={[color1, color2, 'gray']} />
                <SubmitButton colors={[color1, color2]}>Submit</SubmitButton>
            </Form>
        </div>
    );
}