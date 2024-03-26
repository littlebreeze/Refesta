package com.a601.refesta.search.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class AutoCompleteRes {

    private List<String> festivalWordList;

    private List<String> artistWordList;
}
