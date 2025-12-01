import Karuzela from './components/karuzela';
import { Metadata } from 'next';

export const metadata : Metadata = {
    title: 'Carousel'
}

export default function HomePage() {
    return (
        <main>
            <div className='center'>
                <Karuzela interval={3000}>
                    <div>
                        <p>This is a cool</p>
                        <p>Carousel component!</p>
                    </div>
                    
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p>Phasellus imperdiet, nulla et dictum interdum.</p>
                    </div>

                    <div>
                        <p>Vestibulum ante ipsum primis in faucibus orci luctus et.</p>
                        <p>Mauris placerat eleifend leo.</p>
                    </div>

                    <div>
                        <p>Quisque sit amet est et sapien ullamcorper pharetra.</p>
                        <p>Ut euismod, urna eu tincidunt consectetur.</p>
                        <p>Curabitur bibendum eros non augue dictum.</p>
                    </div>

                    <div>
                        <p>Donec volutpat, sapien nec malesuada gravida.</p>
                        <p>Etiam cursus leo vel metus ultricies, ac viverra urna bibendum.</p>
                    </div>

                    <div>
                        <p>Sed egestas, ante et vulputate volutpat.</p>
                        <p>Aliquam erat volutpat.</p>
                    </div>

                    <div>
                        <p>Morbi in sem quis dui placerat ornare.</p>
                        <p>Praesent dapibus, neque id cursus faucibus.</p>
                    </div>
                </Karuzela>
            </div>
        </main>
    );
}