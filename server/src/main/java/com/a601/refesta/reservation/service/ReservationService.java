package com.a601.refesta.reservation.service;

import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.festival.domain.Festival;
import com.a601.refesta.festival.repository.FestivalRepository;
import com.a601.refesta.member.repository.MemberRepository;
import com.a601.refesta.reservation.data.ApproveRes;
import com.a601.refesta.reservation.data.PayRes;
import com.a601.refesta.reservation.data.ReservationReq;
import com.a601.refesta.reservation.domain.Reservation;
import com.a601.refesta.reservation.repository.ReservationRepository;
import com.google.gson.Gson;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

import static com.a601.refesta.reservation.domain.QReservation.reservation;


@Service
@RequiredArgsConstructor
public class ReservationService {

    private final FestivalRepository festivalRepository;
    private final ReservationRepository reservationRepository;
    private final MemberRepository memberRepository;
    private final JPAQueryFactory jpaQueryFactory;

    @Value("${pay.admin-key}")
    private String adminKey;

    public String getKakaoPayUrl(int memberId, ReservationReq reservationReq) {

        Festival festival = festivalRepository.findById(reservationReq.getFestivalId()).orElseThrow();
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String auth = "SECRET_KEY " + adminKey;
        headers.set("Authorization", auth);

        Map<String, Object> req = new HashMap<>();
        req.put("cid", "TC0ONETIME");
        req.put("partner_order_id", "refesta" + memberId);
        req.put("partner_user_id", "ReFesta");
        req.put("item_name", festival.getName());
        req.put("quantity", reservationReq.getCount());
        req.put("total_amount", festival.getPrice() * reservationReq.getCount());
        req.put("tax_free_amount", 0);
        req.put("approval_url", "http://localhost:8080/reservations/success" + "/" + memberId);
        req.put("cancel_url", "http://localhost:8080/reservations/cancel/" + memberId);
        req.put("fail_url", "http://localhost:8080/reservations/fail/" + memberId);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(req, headers);

        ResponseEntity<String> response = rt.exchange(
                "https://open-api.kakaopay.com/online/v1/payment/ready",
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        Gson gson = new Gson();

        PayRes payRes = gson.fromJson(response.getBody(), PayRes.class);

        Reservation reservation = Reservation.builder()
                .member(memberRepository.findById(memberId).orElseThrow())
                .festival(festival)
                .count(reservationReq.getCount())
                .tid(payRes.getTid())
                .status("READY")
                .build();
        reservationRepository.save(reservation);

        return payRes.getNext_redirect_pc_url();
    }

    public int getKaKaoPayApprove(Integer memberId, String pgToken) {

        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String auth = "SECRET_KEY " + adminKey;
        headers.set("Authorization", auth);

        Map<String, Object> req = new HashMap<>();
        req.put("cid", "TC0ONETIME");
        req.put("tid", getTid(memberId));
        req.put("partner_order_id", "refesta" + memberId);
        req.put("partner_user_id", "ReFesta");
        req.put("pg_token", pgToken);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(req, headers);

        ResponseEntity<String> response = rt.exchange(
                "https://open-api.kakaopay.com/online/v1/payment/approve",
                HttpMethod.POST,
                requestEntity,
                String.class
        );

        Gson gson = new Gson();

        ApproveRes approveRes = gson.fromJson(response.getBody(), ApproveRes.class);
        if (approveRes.getError_message() != null || approveRes.getTid() == null) {
            throw new CustomException(ErrorCode.KAKAOPAY_FAILED_ERROR);
        }

        Reservation reservation = reservationRepository.findByTid(approveRes.getTid()).orElseThrow();
        reservation.statusSuccess();
        reservationRepository.save(reservation);
        return reservation.getId();

    }

    public String getTid(int memberId) {
        return jpaQueryFactory.select(reservation.tid)
                .from(reservation)
                .where(reservation.member.id.eq(memberId), reservation.status.eq("READY"))
                .orderBy(reservation.createdDate.desc()).limit(1)
                .fetchOne();
    }
}
