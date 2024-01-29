package com.example.medic.qna.service;

import com.example.medic.manager.controller.AdListAllController;
import com.example.medic.manager.domain.Manager;
import com.example.medic.manager.repository.ManagerRepository;
import com.example.medic.qna.domain.Faq;
import com.example.medic.qna.dto.FaqSituationDto;
import com.example.medic.qna.repository.FaqRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FaqSituationService {
    private final FaqRepository faqRepository;
    private final ManagerRepository managerRepository;
    private static final Logger logger = LoggerFactory.getLogger(FaqSituationService.class);


    public List<Faq> faqSituationList(){
        List<Faq> faq = faqRepository.findAll();
        return faq;
    }
    @Transactional
    public Boolean writeFaq(String mId , FaqSituationDto faqSituationDto) {
        try {
            Manager manager = managerRepository.findById(mId).get();
            logger.info("manager1:{}",manager);
            logger.info("midd:{}",mId);
            logger.info("managerrole:{}",manager.getMRole());
            if(manager.getMRole().equals("관리자")){
                Faq faq = Faq.builder()
                        .faqAnswer(faqSituationDto.getFaqAnswer())
                        .faqQuestion(faqSituationDto.getFaqQuestion())
                        .faqDate(faqSituationDto.getFaqDate())
                        .faqMdDate(faqSituationDto.getFaqMdDate())
                        .manager(manager)
                        .build();
                faqRepository.save(faq);
                return true;
            }
            return  false;

        } catch (Exception e) {
            return false;
        }

    }
        public Boolean updateFaq(String mId, FaqSituationDto faqSituationDto){
        try{

            Manager manager =  managerRepository.findById(mId).get();
            if (manager.getMRole().equals("관리자")){

                Faq faq = new Faq();
                faq.toBuilder()
                        .faqId(faqSituationDto.getFaqId())
                        .faqAnswer(faqSituationDto.getFaqAnswer())
                        .faqDate(faqSituationDto.getFaqDate())
                        .faqQuestion(faqSituationDto.getFaqQuestion())
                        .faqMdDate(faqSituationDto.getFaqMdDate())
                        .manager(manager)
                        .build();

                faqRepository.save(faq);

                return true;
            }
            return  false;

        }catch (Exception e){
            return false;
        }

        }

        public Boolean deleteFaq(Long faqId){
        try{
            faqRepository.deleteById(faqId);
            return true;
        }catch (Exception e){
            return false;
        }
        }


}
