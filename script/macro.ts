import { Result, Ok, Err } from "reliq";
import { $$define } from "ts-macros";

// Define the `$` macro to check Result and propagate errors
function $() {
    $$define("$", function (expr: any) {
        return {
          type: "macro",
          expr: expr,
          transform: (ctx: any) => {
            // Wrap the expression to propagate errors from Result
            const result = ctx.unwrap();
            if (result.err()) {
              return result; // If error, propagate error
            }
            return result.unwrapSafely(); // If Ok, return the value
          }
        };
      });
}


// Usage example
const test = () => {
  let r = Result.wrap(() => "Success!");
  
  // Apply the $ macro to automatically unwrap or propagate errors
  let x = $(r);
  console.log(x); // Should log the unwrapped value or error
};

test();
