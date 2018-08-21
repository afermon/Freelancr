package org.cosmicode.freelancr.service;

import com.paypal.api.payments.*;
import com.paypal.api.payments.Currency;
import org.cosmicode.freelancr.config.Constants;
import org.cosmicode.freelancr.domain.Card;
import org.cosmicode.freelancr.domain.Project;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;

/**
 * Service Implementation for PayPal integration.
 */
@Service
@Transactional
public class PaypalIntegrationService {

    private final Logger log = LoggerFactory.getLogger(PaypalIntegrationService.class);
    private final APIContext paypalAPIContext;

    public PaypalIntegrationService() {
        paypalAPIContext = new APIContext(Constants.PAYPAL_CLIENT_ID, Constants.PAYPAL_CLIENT_SECRET, Constants.PAYPAL_MODE);
    }

    public boolean payoutFreelancerCardCompleted(Card card) {
        // ###Payout
        Payout payout = new Payout();

        PayoutSenderBatchHeader senderBatchHeader = new PayoutSenderBatchHeader();

        // #### Batch Header Instance
        Random random = new Random();
        senderBatchHeader.setSenderBatchId(
            new Double(random.nextDouble()).toString()).setEmailSubject("You have a new Freelancr Payout!");

        // ### Currency
        Currency amount = new Currency();
        amount.setValue(card.getBudget().toString()).setCurrency("USD");

        // #### Sender Item
        PayoutItem senderItem = new PayoutItem();
        senderItem.setRecipientType("Email")
            .setNote("Payment for: " + card.getTitle())
            .setReceiver(card.getUser().getEmail())
            .setSenderItemId(card.getId().toString()).setAmount(amount);

        List<PayoutItem> items = new ArrayList<>();
        items.add(senderItem);

        payout.setSenderBatchHeader(senderBatchHeader).setItems(items);

        PayoutBatch batch;
        try {
            // ###Create Payout Synchronous
            Map<String, String> parameters = new HashMap<String, String>();
            parameters.put("sync_mode", "false");  // Non synchronous

            batch = payout.create(paypalAPIContext, parameters);

            log.info("Payout Batch With ID: "
                + batch.getBatchHeader().getPayoutBatchId());
            return true;
        } catch (PayPalRESTException e) {
            log.error("Failed payment: " + Payout.getLastRequest() + " " + e.getMessage());
            return false;
        }
    }

    public String changeProjectOwnerCardCompleted(Card card, Project project){
        String redirectUrl = "";
        Amount amount = new Amount();
        amount.setCurrency("USD");
        amount.setTotal(card.getBudget().toString());

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        List<Transaction> transactions = new ArrayList<Transaction>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl("https://www.freelancr.me");
        redirectUrls.setReturnUrl("https://www.freelancr.me");
        payment.setRedirectUrls(redirectUrls);

        try {
            Payment createdPayment = payment.create(paypalAPIContext);
            log.info(createdPayment.toString());

            if(createdPayment!=null){
                List<Links> links = createdPayment.getLinks();
                for (Links link:links) {
                    if(link.getRel().equals("approval_url")){
                        redirectUrl = link.getHref();
                        break;
                    }
                }
            }

        } catch (PayPalRESTException e) {
            log.error("PayPal error: " + e.getMessage());
        } catch (Exception ex) {
            log.error("PayPal error: " + ex.getMessage());
        }

        return redirectUrl;
    }
}
