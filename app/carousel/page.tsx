import Karuzela from '../components/Carousel';
import Carousel from '../components/Carousel2';
import { Metadata } from 'next';

export const metadata : Metadata = {
    title: 'Carousel'
}

export default function HomePage() {
    return (
        <main>
            <div className='center'>
                <Carousel interval={2000}>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime magni, dolore deleniti iure odit blanditiis molestias repellendus minima voluptatum dolor et molestiae odio expedita aperiam culpa amet voluptates. Doloribus, laborum.</p>
                    </div>
                    <div>
                        <p>hello 2</p>
                        <p>hello 3</p>
                    </div>
                    <div>
                        <p>hello 2</p>
                        <p>hello 3</p>
                    </div>
                </Carousel>
                {/*<Karuzela interval={4000}>
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
                </Karuzela>*/}
            </div>
        </main>
    );
}