package learn.collectMe.controllers;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;

@RestController
@CrossOrigin
@RequestMapping("api/store")
public class SessionController {

    @PostMapping("/api/create/session")
    public ResponseEntity<?> createSession() {
        ArrayList<Object> lineItems = new ArrayList<>();
        HashMap<String, Object> firstLineItem = new HashMap<>();
        firstLineItem.put("price", "price_1Mr8M1Lq25dmYwYDhuYAfF0D");
        firstLineItem.put("quantity", 1);
        lineItems.add(firstLineItem);

        HashMap<String, Object> sessionParms = new HashMap<>();
        sessionParms.put("success_url", "http://localhost:8080/success.html");
        sessionParms.put("line_items", lineItems);
        sessionParms.put("mode", "payment");

        try {
            Session session = Session.create(sessionParms);
            return new ResponseEntity<>(session.getUrl(), HttpStatus.OK);
        } catch (StripeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}