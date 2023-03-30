package learn.collectMe.controllers;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    // DataAccessException is the super class of many Spring database exceptions
    // including BadSqlGrammarException.

    @ExceptionHandler(BadSqlGrammarException.class)
    public ResponseEntity<ErrorResponse> handleException(BadSqlGrammarException ex) {

        // Log the exception?

        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse("Check your SQL basics!"),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ErrorResponse> handleException(NullPointerException ex) {

        // Log the exception?

        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse("Null values are not allowed!"),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ErrorResponse> handleException(DataAccessException ex) {

        // Log the exception?

        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse("Your data maybe off, re-check it."),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // IllegalArgumentException is the super class for many Java exceptions
    // including all formatting (number, date) exceptions.
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleException(IllegalArgumentException ex) {

        // Log the exception?

        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse(ex.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // This is our absolute last resort. Yuck.
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {

        // Log the exception?

        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse("Sorry, unspecified error occured :("),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
