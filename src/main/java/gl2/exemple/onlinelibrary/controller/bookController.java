package gl2.exemple.onlinelibrary.controller;

import gl2.exemple.onlinelibrary.DTO.BookRequest;
import gl2.exemple.onlinelibrary.model.Book;
import gl2.exemple.onlinelibrary.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController //ça ve
@RequestMapping("/books") // base de url
public class bookController {
    private final BookService bookService;

    public bookController(BookService bookService) {
        this.bookService = bookService;
    }
    @GetMapping
    public List<Book> getAllBooks(){
        return bookService.gettAllBooks();
    }
    @GetMapping("/{id}")// ici ça veut dire il faut ajouter dans url /id
    //le @pathvariable recupère id
    public Book getByid(@PathVariable Integer id){
        return bookService.getByid(id);
    }
    @GetMapping("/search")
    // ici request param il filtre on indique ce que on cherche specifiquement
    // on ajoute ?param=la valeur qu'on cherche
    public List<Book> searchBooks(@RequestParam String title) {
        return bookService.searchByTitle(title);
    }
    @PostMapping
    public Book addBook(@RequestBody BookRequest bookRequest){
        return bookService.addBook(bookRequest.getTitle(),bookRequest.getDescription(),
                bookRequest.getAuthorName(),bookRequest.getCategoryName());
    }

}
