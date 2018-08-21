package org.cosmicode.freelancr.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class GitHubInvalidException extends AbstractThrowableProblem {

    public GitHubInvalidException() {
        super(ErrorConstants.GITHUB_INVALID, "GitHub account does not exist", Status.BAD_REQUEST);
}
}
