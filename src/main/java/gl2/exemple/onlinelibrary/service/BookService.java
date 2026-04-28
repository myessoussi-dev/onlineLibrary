package gl2.exemple.onlinelibrary.service;

import gl2.exemple.onlinelibrary.model.Author;
import gl2.exemple.onlinelibrary.model.Book;
import gl2.exemple.onlinelibrary.model.Category;
import gl2.exemple.onlinelibrary.repository.AuthorRepository;
import gl2.exemple.onlinelibrary.repository.BookRepository;
import gl2.exemple.onlinelibrary.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final CategoryRepository categoryRepository;

    public BookService(BookRepository bookRepository, AuthorRepository authorRepository, CategoryRepository categoryRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.categoryRepository = categoryRepository;
    }

    public Book addBook(String title ,String description,
                        String authorName,String categoryName
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

        return bookRepository.save(book);
        //save return l'objet qui vient d'etre creè dans la DB
    }
    public List<Book> gettAllBooks(){
        return bookRepository.findAll();
    }

    public Book getByid(Integer id) {
        return bookRepository.findById(id).orElseThrow(()->new RuntimeException("book not foun!"));
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
    public List<Book> searchByTitle(String title){
        return bookRepository.findByTitle(title);
    }
}
