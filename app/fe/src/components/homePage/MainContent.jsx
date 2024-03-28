import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { allBooks, booksError, getAllBooks, isBooksLoading } from "../../redux/books/booksSlice";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import ErrorAlert from "../alerts/ErrorAlert";
import BookCard from "../card/BookCard";

const MainContent = () => {
    const dispatch = useDispatch();
    const books = useSelector(allBooks);
    const isLoading = useSelector(isBooksLoading);
    const error = useSelector(booksError);

    useEffect(() => {
        dispatch(getAllBooks());
    }, [dispatch]);

    return (
        <div className="container pt-5 pb-5">
            <div className="row">
                {isLoading && <LoadingIndicator />}
                {!isLoading && error && (
                    <ErrorAlert
                        message="Oops! Qualcosa è andato storto durante il caricamento dei dati"
                    />
                )}
                {!isLoading && !error && (
                    books.books && books.books.map((book) => (
                        <div key={book._id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                            <BookCard
                                title={book.title}
                                description={book.description}
                                cover={book.cover}
                                author={book.author}
                                editor={book.editor}
                                isFeatured={book.isFeatured}
                                pubDate={book.pubDate}
                                price={book.price.$numberDecimal}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MainContent;
