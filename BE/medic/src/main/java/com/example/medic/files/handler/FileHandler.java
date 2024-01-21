package com.example.medic.files.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

import java.nio.file.FileAlreadyExistsException;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.nio.file.Files;
@Component
public class FileHandler {
    private final List<String> extensions = new ArrayList<>(List.of("jpeg", "png", "gif", "mp4", "mp3", "m4a", "mpeg", "wav", "wma"));

    public List<String> parseFile(Path path, List<MultipartFile> multipartFiles) throws IOException {

        try{
            Files.createDirectory(path);
            List <String> pathList = saveFiledirectory(path, multipartFiles);
            return pathList;
        } catch (FileAlreadyExistsException e){
            List <String> pathList = saveFiledirectory(path, multipartFiles);
            return pathList;
        } catch (NoSuchFileException e) {
            return null;
        }catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static List<String> saveFiledirectory(Path path, List<MultipartFile> multipartFiles) throws IOException {
        List<String> pathList = new ArrayList<>();
        for(MultipartFile file : multipartFiles){
            String filename = file.getOriginalFilename();
            String extension = filename.substring(filename.lastIndexOf("."));
            String saveFilename = UUID.randomUUID()+extension;

            File saveFile = new File(path.toFile(), saveFilename);
            file.transferTo(saveFile);

            pathList.add(saveFilename);
        }
        return pathList;
    }
}