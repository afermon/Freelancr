package org.cosmicode.freelancr.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import org.cosmicode.freelancr.domain.enumeration.MessageStatus;

/**
 * A DTO for the ApplicationMessage entity.
 */
public class ApplicationMessageDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 4, max = 2000)
    private String message;

    @NotNull
    private MessageStatus status;

    private Long applicationId;

    private Long senderId;

    private String senderLogin;

    private Long receiverId;

    private String receiverLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public MessageStatus getStatus() {
        return status;
    }

    public void setStatus(MessageStatus status) {
        this.status = status;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long userId) {
        this.senderId = userId;
    }

    public String getSenderLogin() {
        return senderLogin;
    }

    public void setSenderLogin(String userLogin) {
        this.senderLogin = userLogin;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long userId) {
        this.receiverId = userId;
    }

    public String getReceiverLogin() {
        return receiverLogin;
    }

    public void setReceiverLogin(String userLogin) {
        this.receiverLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ApplicationMessageDTO applicationMessageDTO = (ApplicationMessageDTO) o;
        if(applicationMessageDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), applicationMessageDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ApplicationMessageDTO{" +
            "id=" + getId() +
            ", message='" + getMessage() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
