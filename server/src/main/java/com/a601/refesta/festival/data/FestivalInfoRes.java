package com.a601.refesta.festival.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@Builder
public class FestivalInfoRes {

    @NonNull
    private String name;

    @NonNull
    private LocalDate date;

    @NonNull
    private String location;

    @NonNull
    private String posterUrl;

    private int price;
    private String infoImgUrl;

    public void setDetailInfo(Integer price, String infoImgUrl) {
        this.price = price;
        this.infoImgUrl = infoImgUrl;
    }
}
