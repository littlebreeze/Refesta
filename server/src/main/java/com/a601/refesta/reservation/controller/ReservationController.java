package com.a601.refesta.reservation.controller;


import com.a601.refesta.common.jwt.TokenProvider;
import com.a601.refesta.common.response.SuccessResponse;
import com.a601.refesta.reservation.data.ReservationReq;
import com.a601.refesta.reservation.data.ReservationRes;
import com.a601.refesta.reservation.service.ReservationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Map;
import java.util.TreeMap;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;
    private final TokenProvider tokenProvider;

    @Value("${spring.refesta.front.url}")
    private String REFESTA_URL;

    @PostMapping
    public SuccessResponse<Map<String, String>> getKakaoPayUrl(HttpServletRequest request, @RequestBody ReservationReq reservationReq) {
        int memberId = tokenProvider.getMemberIdByToken(request);
        Map<String, String> data = new TreeMap<>();
        data.put("redirect_url", reservationService.getKakaoPayUrl(memberId, reservationReq));
        return new SuccessResponse<>(data);
    }

    @GetMapping("/success/{id}")
    public RedirectView getKaKaoPayApprove(@PathVariable("id") Integer id,
                                           @RequestParam("pg_token") String pgToken) {
        // 경로 생성
        String redirectUrl = REFESTA_URL+"/reservation/result/" + reservationService.getKaKaoPayApprove(id, pgToken);

        // RedirectView 생성 및 설정
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(redirectUrl);
        // 리디렉션 수행
        return redirectView;
    }

    @GetMapping("/{reservation_id}")
    public SuccessResponse<ReservationRes> getReservation(HttpServletRequest request,
                                                          @PathVariable("reservation_id") Integer reservationId) {
        int memberId = tokenProvider.getMemberIdByToken(request);
        ReservationRes reservationRes = reservationService.getReservation(memberId, reservationId);
        return new SuccessResponse<>(reservationRes);
    }

}
