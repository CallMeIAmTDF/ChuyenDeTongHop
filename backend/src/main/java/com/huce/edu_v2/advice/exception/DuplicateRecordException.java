package com.huce.edu_v2.advice.exception;

public class DuplicateRecordException extends RuntimeException {
    public DuplicateRecordException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("The %s data field = '%s' already exists in the %s table, please use another value!", fieldName, fieldValue, resourceName));
    }
}