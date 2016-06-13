# My Tests

These are the things I find myself doing manually to test the app. They should be automated.

## Client

The expectations below apply when the flash overwrite strategy is `OVERWRITE`.

### Index

  + Visit the home page. Expect to see multiple table rows.
    + Click delete button multiple times. Expect flash to overwrite.
    + Click recycle button. Expect to see >= table rows than before. Expect flash to overwrite.
    + Click a table row link. Expect to see a single table row.
    + Click edit button. Expect there to be no flash. Expect to see form with pre-filled values.

### New

  + Visit the new page. Expect to see a blank form.
    + Click submit (blank form values). Expect flash to show two validation errors.
    + Fill-in only one form value and click submit. Expect flash to show one validation error.
    + Fill-in only the other form value and click submit. Expect flash to show one validation error.
    + Fill-in both form values and click submit. Expect to see multiple table rows.

### Edit

  + Visit an edit page. Expect to see form with pre-filled values.
    + Click submit (blank form values). Expect flash to show two validation errors.
    + Fill-in only one form value and click submit. Expect flash to show one validation error.
    + Fill-in only the other form value and click submit. Expect flash to show one validation error.
    + Fill-in both form values and click submit. Expect to see multiple table rows.

## Server

  + Make a request to `/api/robots`.
