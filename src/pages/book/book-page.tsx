import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'entities/hooks';
import { Booking, Comment, Delivery } from 'entities/interfaces';
import { fetchBook } from 'store/book-page-slice';
import { Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LoadingStatus } from 'entities/enums';
import { Loader } from 'components/loader';
import { ToastContainer, toast } from 'react-toastify';

import { ReactComponent as ArrowIcon } from '../../assets/arrowIcon.svg';
import defaultImage from '../../assets/defaultImage.png'
import { Comment as CommentComponent } from '../../components/comment';
import { Button } from '../../components/commons/button';
import { Rating } from '../../components/commons/rating';
import { ReactComponent as CrossIcon } from '../../assets/crossIcon.svg';


import './book-page.scss';

import 'swiper/scss';
import 'swiper/css/scrollbar';


export const BookPage = () => {
    const { bookId } = useParams();
    const [commentsView, setCommentsView] = useState(true);
    const [activeThumb, setActiveThumb] = useState<any>();
    const dispatch = useAppDispatch();
    const book = useAppSelector(state => state.bookPage.book);
    const bookLoadingStatus = useAppSelector(state => state.bookPage.loadingStatus);

    useEffect(() => {
        dispatch(fetchBook(bookId as string));
    }, [dispatch, bookId]);

    useEffect(() => {
        if (bookLoadingStatus === LoadingStatus.error) {
            toast.error('Что-то пошло не так. Обновите страницу через некоторое время.');
        }
    }, [bookLoadingStatus]);

    const tableLeft = [
        ['Издательство', book?.publish],
        ['Год издания', book?.issueYear],
        ['Страниц', book?.pages],
        ['Переплёт', book?.cover],
        ['Формат', book?.format],
    ]

    const tableRight = [
        ['Жанр', book?.categories?.join(', ')],
        ['Вес', book?.weight],
        ['ISBN', book?.ISBN],
        ['Изготовитель', book?.producer],
    ]

    const closeButton = () => (
        <button type='button' aria-label='close'><CrossIcon /></button>
    )

    return (
        bookLoadingStatus === LoadingStatus.loading ?
            <div data-test-id='loader'><Loader /></div> :
            bookLoadingStatus === LoadingStatus.error ?
                <div data-test-id='error'>
                    <ToastContainer closeButton={closeButton}
                        position='top-center'
                        newestOnTop={false}
                        closeOnClick={true}
                        autoClose={false}
                        rtl={false} />
                </div> :
                <div className='book-page'>
                    <div className='book'>
                        <div className='line'><p>{book?.categories?.join(', ')} / {book?.title}</p></div>
                        <div className='top'>
                            <div className='cover'>
                                {book?.images && book?.images?.length > 1
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
                                            {book.images.map((image: { url: string }) => ((<SwiperSlide><img src={`https://strapi.cleverland.by${image.url}`} alt='Book' /></SwiperSlide>)))}
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
                                            {book.images.map((image: { url: string }) => ((<SwiperSlide data-test-id='slide-mini'><img src={`https://strapi.cleverland.by${image.url}`} alt='Book' /></SwiperSlide>)))}
                                        </Swiper>
                                    </div>
                                    :
                                    <img src={`https://strapi.cleverland.by${book?.images[0].url}` || defaultImage} alt='Book' />
                                }
                            </div>
                            <div className='title'>
                                <h1>{book?.title}</h1>
                                <div className='author'>{book?.authors?.join(', ')}</div>
                                <Button booking={book?.booking as Booking} delivery={book?.delivery as Delivery} />
                            </div>
                            <div className='description'>
                                <h2>О книге</h2>
                                <div className='hr' />
                                <p>{book?.description}
                                </p>
                            </div>
                        </div>
                        <div className='middle'>
                            <p>Рейтинг</p>
                            <div className='hr' />
                            <div className='middle-rating'>
                                <div className='sharp'><Rating rating={book?.rating as number} isSmooth={false} showWhenNull={true} /></div>
                                <div className='smooth'><Rating rating={book?.rating as number} isSmooth={true} showWhenNull={true} /></div>
                                {book?.rating ? null : <p>ещё нет оценок</p>}
                                <p>{book?.rating as number}</p>
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
                                <p className='text'>{book?.comments?.length}</p>
                                {book?.comments ?
                                    <button data-test-id='button-hide-reviews' type='button' onClick={() => (setCommentsView(!commentsView))}>
                                        <ArrowIcon className={classNames('icon', { 'reversed': !commentsView })} />
                                    </button>
                                    : null}
                            </div>
                            <div className='hr' />
                            <div className={classNames('comments', { 'hide': !commentsView })}>{book?.comments?.map((comment: Comment) => <CommentComponent date={comment.createdAt} author={`${comment.user.firstName} ${comment.user.lastName}`} rating={comment.rating} text={comment.text!} />)}</div>
                            <div data-test-id='button-rating' className='button'>
                                <button type='button'>Оценить книгу</button>
                            </div>
                        </div>
                    </div>
                </div >

    )
};
