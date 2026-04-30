package gl2.exemple.onlinelibrary.service;

import gl2.exemple.onlinelibrary.DTO.BookDTO;
import gl2.exemple.onlinelibrary.model.Author;
import gl2.exemple.onlinelibrary.model.Book;
import gl2.exemple.onlinelibrary.model.Category;
import gl2.exemple.onlinelibrary.repository.AuthorRepository;
import gl2.exemple.onlinelibrary.repository.BookRepository;
import gl2.exemple.onlinelibrary.repository.CategoryRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final CategoryRepository categoryRepository;
    public BookDTO fn(Book book){
        BookDTO dto = new BookDTO();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setDescription(book.getDescription());
        dto.setAuthorName(book.getAuthor().getName());
        dto.setCategoryName(book.getCategory().getName());
        dto.setAvailable(book.getAvailable());
        dto.setImageUrl(book.getImageUrl());
        return dto;
    }

    public BookService(BookRepository bookRepository, AuthorRepository authorRepository, CategoryRepository categoryRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.categoryRepository = categoryRepository;
    }

    public Book addBook(String title ,String description,
                        String authorName,String categoryName,
                        String image
                        ){
        Author author =authorRepository.findByName(authorName);
        if(author==null){
            author =new Author();
            author.setName(authorName);
            author=authorRepository.save(author);
        }
        Category category=categoryRepository.findByName(categoryName);
        if (category==null){
            category=new Category();
            category.setName(categoryName);
            category=categoryRepository.save(category);
        }
        Book book = new Book();
        book.setDescription(description);
        book.setTitle(title);
        book.setCategory(category);
        book.setAuthor(author);
        book.setImageUrl(image);
        try{
            return bookRepository.save(book);
        }catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Name already exists");
        }

        //save return l'objet qui vient d'etre creè dans la DB
    }
    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll().stream().map(this::fn).toList();
    }

    public BookDTO getByid(Integer id) {
        return bookRepository.findById(id).map(book->fn(book)) //.map(this::fn)
                .orElseThrow(()->new RuntimeException("book not foun!"));
    }
    // orElseThrow() est une méthode de Optional qui retourne la valeur si elle existe,
    // sinon elle lance une exception.
    //
    // Elle prend une lambda (Supplier) car l’exception n’est créée que si nécessaire
    // (lazy evaluation = optimisation → on évite de créer l’objet inutilement).
    //
    // Une lambda est une fonction anonyme (sans nom) écrite de façon courte avec "->".
    // Elle permet de simplifier le code en Java en remplaçant les classes anonymes.
    //
    // Ici, la lambda "() -> new RuntimeException(...)" est exécutée uniquement
    // si le Optional est vide (donc si le livre n'existe pas)
    public List<BookDTO> searchByTitle(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title).stream().map(book -> fn(book))
                .toList();
    }
            /*                                [Book1, Book2, Book3]
        ↓ stream (pipeline)                             ↓ stream (pipeline)
                                                    Book1 → DTO1
                                                    Book2 → DTO2
                                                    Book3 → DTO3
                                                            ↓ toList
                                                    [DTO1, DTO2, DTO3]
            List<Book>
               ↓ stream()
            Stream<Book>
               ↓ map()
            Stream<BookDTO>
               ↓ toList()
            List<BookDTO>*/
    public List<BookDTO> getBooksByAuthorName(String name){
        return bookRepository.findByAuthorNameContainingIgnoreCase(name)
                .stream().map(this::fn).toList();
    }
    public void deleteBook(Integer id){
        bookRepository.deleteById(id);
    }

}
