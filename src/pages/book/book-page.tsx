import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import classNames from 'classnames';
import './book-page.scss';
import { Button } from '../../components/commons/button';
import { Rating } from '../../components/commons/rating';
import { Comment } from '../../components/comment';
import { Genres } from '../../components/sidebar/enums';
import { ReactComponent as ArrowIcon } from '../../assets/arrowIcon.svg';
import defaultImage from '../../assets/defaultImage.png'


export const BookPage = (props: { store: any }) => {
    const { bookId } = useParams();
    const [commentsView, setCommentsView] = useState(true);
    const [activeThumb, setActiveThumb] = useState<any>();
    const book = props.store.booksData.map((el: any) => el.books.find((book: any) => book.id === bookId)).filter((el: any) => el)[0];
    const tableLeft = [
        ['Издательство', book.publisher],
        ['Год издания', book.year.toString()],
        ['Страниц', book.pageAmount.toString()],
        ['Переплёт', book.binding],
        ['Формат', book.format],
    ]
    const tableRight = [
        ['Жанр', Genres[book.category as keyof typeof Genres]],
        ['Вес', `${book.weight} г`],
        ['ISBN', book.isbn],
        ['Изготовитель', book.manufacturer],
    ]

    return (
        <div className='book-page'>
            <div className='book'>
                <div className='line'><p>{Genres[book.category as keyof typeof Genres]} / {book.title}</p></div>
                <div className='top'>
                    <div className='cover'>
                        {book.images.length > 1
                            ?
                            <div className='cover-wrapper'>
                                <Swiper
                                    data-test-id='slide-big'
                                    className={classNames('swiper-top')}
                                    modules={[Pagination, Thumbs]}
                                    watchSlidesProgress={true}
                                    slidesPerView={1}
                                    pagination={{ clickable: true }}
                                    spaceBetween={90}
                                    loop={true}
                                    thumbs={activeThumb ? { swiper: activeThumb } : undefined}
                                >
                                    {book.images.map((el: string) => ((<SwiperSlide><img src={el} alt='Book' /></SwiperSlide>)))}
                                </Swiper>
                                <Swiper
                                    onSwiper={(activeThumb) => setActiveThumb(activeThumb)}
                                    centerInsufficientSlides={true}
                                    className={classNames('swiper-bottom', { 'many-books': book.images.length > 4 })}
                                    modules={[Navigation, Thumbs, Scrollbar]}
                                    watchSlidesProgress={true}
                                    slidesPerView={5}
                                    scrollbar={{ draggable: true, dragSize: 190 }}
                                >
                                    {book.images.map((el: string) => ((<SwiperSlide data-test-id='slide-mini'><img src={el} alt='Book' /></SwiperSlide>)))}
                                </Swiper>
                            </div>
                            :
                            <img src={book.images[0] || defaultImage} alt='Book' />
                        }
                    </div>
                    <div className='title'>
                        <h1>{book.title}</h1>
                        <div className='author'>{book.author}</div>
                        <Button bookingStatus={0} />
                    </div>
                    <div className='description'>
                        <h2>О книге</h2>
                        <div className='hr' />
                        <p>{book.description}
                        </p>
                    </div>
                </div>
                <div className='middle'>
                    <p>Рейтинг</p>
                    <div className='hr' />
                    <div className='middle-rating'>
                        <div className='sharp'><Rating rating={book.rating} isSmooth={false} /></div>
                        <div className='smooth'><Rating rating={book.rating} isSmooth={true} /></div>
                        <p>{book.rating}</p>
                    </div>
                    <p>Подробная информация</p>
                    <div className='hr' />
                    <div className='table'>
                        <table>
                            {tableLeft.map(el => <tr>{el.map(item => <td>{item}</td>)}</tr>)}
                        </table>
                        <table>
                            {tableRight.map(el => <tr>{el.map(item => <td>{item}</td>)}</tr>)}
                        </table>
                    </div>
                </div>
                <div className='bottom'>
                    <div className='feedback'>
                        <p className='text'>Отзывы</p>
                        <p className='text'>{book.comments.length}</p>
                        <button data-test-id='button-hide-reviews' type='button' onClick={() => (setCommentsView(!commentsView))}>
                            <ArrowIcon className={classNames('icon', { 'reversed': !commentsView })} />
                        </button>
                    </div>
                    <div className='hr' />
                    <div className={classNames('comments', { 'hide': !commentsView })}>{book.comments.map((comment: any) => <Comment date={comment.date} author={comment.author} rating={comment.rating} text={comment.text!} />)}</div>
                    <div data-test-id='button-rating' className='button'>
                        <button type='button'>Оценить книгу</button>
                    </div>
                </div>
            </div>
        </div >
    )
};
