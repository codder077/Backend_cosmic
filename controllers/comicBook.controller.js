import ComicBook from "../models/comicBook.model.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { AppError } from "../utils/appError.js";

const createComicBook = asyncHandler( async (req, res, next) => {
    const { bookName, bookAuthor, yearOfPublication, price, numberOfPages, condition} = req.body;

    if(!bookName || !bookAuthor || !yearOfPublication || !price || !numberOfPages || !condition){

        return next(new AppError('Please fill in all fields', 400));

    }

    const bookExists = await ComicBook.findOne({bookName});

    if(bookExists){
        return next(new AppError('Comic Book already exists', 400));
    }

    const newComicBook = new ComicBook(req.body);

    if(!newComicBook){
        return next(new AppError('Failed to create comic book', 500));
    }

    await newComicBook.save();

    res.status(201).json({
        success: true,
        message: "Book data stored successfully",
        data: newComicBook
    });
});

const updateComicBook = asyncHandler( async (req, res, next) => {
    const { id } = req.params;

    if(!id){
        return next(new AppError('Please provide a valid id', 400));
    }

    const comicBook = await ComicBook.findByIdAndUpdate(
        id,
        req.body,
        {new: true}
    );

    if(!comicBook){
        return next(new AppError('Failed to update comic book', 500));
    }

    res.status(200).json({
        success: true,
        message: "Book data updated successfully",
        data: comicBook
    });
});

const deleteComicBook = asyncHandler( async (req, res, next) => {
    const { id } = req.params;

    if(!id){
        return next(new AppError('Please provide a valid id', 400));
    }

    const deletedComicBook = await ComicBook.findByIdAndDelete(id);

    if(!deleteComicBook){
        return next(new AppError('Failed to delete comic book', 500));
    }

    res.status(200).json({
        success: true,
        message: "Book data deleted successfully",
        data: {}
    });
});

const getAllComicBooks = asyncHandler( async (req, res, next) => {
    const { bookAuthor, yearOfPublication, price, condition, page=1, limit=10, sortBy='bookName', order = 'asc' } = req.query;

    const filter = {
        ...(bookAuthor && { bookAuthor }),
        ...(yearOfPublication && { yearOfPublication }),
        ...(price && { price: { $lte: price } }),
        ...(condition && { condition })
    };

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortOptions = { [sortBy]: sortOrder };
    
    const comicBooks = await ComicBook.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort(sortOptions);

    const totalComicBooks = await ComicBook.countDocuments(filter);
    
    if (!comicBooks || comicBooks.length === 0) {
        return next(new AppError('No comic books found matching the criteria', 404));
    }

    res.status(200).json({
        success: true,
        message: "Comic book data fetched successfully",
        total: totalComicBooks,
        limit: Number(limit),
        data: comicBooks
    });

});

const getComicBookById = asyncHandler( async (req, res, next) => {
    const id = req.params.id;

    if(!id){
        return next(new AppError('Please provide a valid comic book ID', 400));
    }

    const comicBook = await ComicBook.findById(id);

    if(!comicBook){
        return next(new AppError('No comic book found with the given ID', 404));
    }

    res.status(200).json({
        success: true,
        message: "Comic book data fetched successfully",
        data: comicBook
    })
});

export {
    createComicBook,
    updateComicBook,
    deleteComicBook,
    getAllComicBooks,
    getComicBookById
};
