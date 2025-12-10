import Carousel from '../components/Carousel';
import { Metadata } from 'next';

export const metadata : Metadata = {
    title: 'Carousel'
}

export default function HomePage() {
    return (
        <main>
            <div className='center'>
                <Carousel interval={5000} maxWidth={800}>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime magni, dolore deleniti iure odit blanditiis molestias repellendus minima voluptatum dolor et molestiae odio expedita aperiam culpa amet voluptates. Doloribus, laborum.</p>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi deleniti nostrum eum delectus ea reiciendis esse sunt inventore cum veniam, accusantium doloremque aliquam, corporis veritatis tempore. Soluta molestiae omnis impedit?</p>
                        <p>second text</p>
                    </div>
                    <div>
                        <p>This is sample text</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio accusamus at ipsa inventore, expedita, aut voluptatem esse voluptatum quasi soluta obcaecati ullam, eveniet autem velit animi blanditiis minima sint rem!</p>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt enim reiciendis ipsam necessitatibus, ducimus rerum optio vitae. Consequuntur laboriosam ut harum soluta distinctio et ipsam enim culpa. Ut, architecto ipsa.</p>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate adipisci ipsam veniam itaque vero reiciendis, optio assumenda, animi necessitatibus nesciunt illo, ab quasi aliquid reprehenderit autem aliquam? Molestiae, eos quos!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis voluptate reprehenderit impedit, tempore debitis eum iure, consequatur harum ipsum delectus dolore veniam. Id rerum sunt modi dignissimos perspiciatis quaerat soluta!</p>
                    </div>
                </Carousel>
            </div>
        </main>
    );
}