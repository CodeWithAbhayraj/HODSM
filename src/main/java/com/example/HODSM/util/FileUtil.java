//Agar future me Photo, Aadhaar aur College ID upload karoge.



package com.example.HODSM.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FileUtil {

    private FileUtil() {
    }

    public static String saveFile(String uploadDir,
                                  MultipartFile file) throws IOException {

        Path path = Paths.get(uploadDir);

        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }

        String fileName = System.currentTimeMillis() + "_"
                + file.getOriginalFilename();

        Path filePath = path.resolve(fileName);

        Files.copy(file.getInputStream(), filePath);

        return fileName;
    }

}