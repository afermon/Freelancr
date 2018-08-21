package org.cosmicode.freelancr.config;

/**
 * Application constants.
 */
public final class Constants {

    // Regex for acceptable logins
    public static final String LOGIN_REGEX = "^[_'.@A-Za-z0-9-]*$";

    public static final String SYSTEM_ACCOUNT = "system";
    public static final String ANONYMOUS_USER = "anonymoususer";
    public static final String DEFAULT_LANGUAGE = "en";
    public static final String SLACK_TOKEN = "<SLACK TOKEN>";
    public static final String SLACK_ADMIN_USER = "<SLACK Admin user ID>";
    public static final String GITHUB_TOKEN = "<GITHUB TOKEN>";
    public static final String GITHUB_ACCOUNT = "<GITHUB Account>";
    public static final String PAYPAL_CLIENT_ID = "<PAYPAL CLIENT ID>";
    public static final String PAYPAL_CLIENT_SECRET = "<PAYPAL CLIENT SECRET>";
    public static final String PAYPAL_MODE = "sandbox";
    
    private Constants() {
    }
}
