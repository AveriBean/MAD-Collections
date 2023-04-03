package learn.collectMe.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ImageController {

    @PostMapping("/upload")
    public ResponseEntity<String> upload(MultipartFile file, HttpServletRequest request) {

        String staticPath = getClass().getClassLoader().getResource("./static").getFile();
        String imagesPath = staticPath + "/images";
        File dir = new File(imagesPath);
        if (!dir.exists()) {
            dir.mkdir();
        }

        String filePath = imagesPath + "/" + file.getOriginalFilename();
        String relativePath = "/images/" + file.getOriginalFilename();
        File f = new File(filePath);

        if (f.exists()) {
            return new ResponseEntity(null, HttpStatus.CONFLICT);
        }

        try {
            file.transferTo(f);
        } catch (IOException ex) {
            return new ResponseEntity(null, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return ResponseEntity.ok(relativePath);
    }

    @GetMapping("/image-paths")
    public List<String> imagePaths() {

        String staticPath = getClass().getClassLoader().getResource("./static").getFile();
        String imagesPath = staticPath + "/images";
        File dir = new File(imagesPath);
        if (!dir.exists()) {
            dir.mkdir();
        }

        List<String> result = new ArrayList<>();
        for (File img : dir.listFiles()) {
            result.add(String.format("/images/%s", img.getName()));
        }

        return result;
    }

}
