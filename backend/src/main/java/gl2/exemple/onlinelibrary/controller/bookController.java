package gl2.exemple.onlinelibrary.controller;

import gl2.exemple.onlinelibrary.DTO.BookDTO;
import gl2.exemple.onlinelibrary.DTO.BookRequest;
import gl2.exemple.onlinelibrary.model.Book;
import gl2.exemple.onlinelibrary.service.BookService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController //ça veut dire qu'il renvoi du JSON
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/books") // base de url
public class bookController {
    private final BookService bookService;
    public bookController(BookService bookService) {
        this.bookService = bookService;
    }


    @GetMapping
    public List<BookDTO> getAllBooks(){
        return bookService.getAllBooks();
    }


    @GetMapping("/{id}")// ici ça veut dire il faut ajouter dans url /id
    //le @pathvariable recupère id
    public BookDTO getByid(@PathVariable Integer id){
        return bookService.getByid(id);
    }


    @GetMapping("/search")
    // ici request param il filtre on indique ce que on cherche specifiquement
    // on ajoute ?param=la valeur qu'on cherche
    public List<BookDTO> searchBooks(@RequestParam String title) {

        return bookService.searchByTitle(title);
    }
    @PostMapping
    public Book addBook(@Valid @RequestBody BookRequest bookRequest){

        return bookService.addBook(bookRequest);
    }

    @GetMapping("/searchByAuthor")
    public List<BookDTO> searchByAuthorName(@RequestParam String name){
        return bookService.getBooksByAuthorName(name);
    }
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Integer id){

        bookService.deleteBook(id);
    }
    @PatchMapping("/{id}")
    public void updateBook(@PathVariable Integer id, @RequestBody BookRequest bookRequest){
         bookService.updateBook(id,bookRequest);
    }
    @GetMapping("/availableBook")
    public List<BookDTO> getByAvailable(){

        return bookService.getBookByAvailable();
    }
}