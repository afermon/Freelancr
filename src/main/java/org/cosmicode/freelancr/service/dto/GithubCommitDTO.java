package org.cosmicode.freelancr.service.dto;

public class GithubCommitDTO {
    private String sha;
    private String message;

    public GithubCommitDTO(String sha, String message) {
        this.sha = sha;
        this.message = message;
    }

    public String getSha() {
        return sha;
    }

    public void setSha(String sha) {
        this.sha = sha;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "GithubCommitDTO{" +
            "sha='" + sha + '\'' +
            ", message='" + message + '\'' +
            '}';
    }
}
