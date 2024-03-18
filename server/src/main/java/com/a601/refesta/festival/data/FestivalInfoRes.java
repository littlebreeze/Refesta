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

    private String name;

    private LocalDate date;

    private String location;

    private String posterUrl;

    private int price;

    private boolean isEnded;
}
