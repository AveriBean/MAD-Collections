package learn.collectMe.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ChargeController {

    @PostMapping("/api/charge")
    public ResponseEntity<?> charge() {

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("amount", 1000);
        params.put("currency", "usd");
        params.put("source", "tok_visa");
        params.put("description", "Charge test");
        params.put("receipt_email", "example@example.com");

        try {
            Charge charge = Charge.create(params);
            System.out.println(charge);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (StripeException ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}