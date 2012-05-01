var argumentSize = function (function_name, need, got) {
    if (need !== got) {
        throw('Wrong number of arguements for '+function_name+
              '. Required: '+need+'. Recived: '+got);
    }
}
var evalScheem = function (expr, env) {
    // Numbers evaluate to themselves
    if (typeof expr === 'number') {
        return expr;
    }
    // Strings are variable references
    if (typeof expr === 'string') {
        return env[expr];
    }
    if (expr === 'error') throw('Error');
    // Look at head of list for operation
    switch (expr[0]) {
        // Begin
        case 'begin':
            var i = 1;
            while(i < expr.length-1) {
                evalScheem(expr[i], env);
                i += 1;
            }
            return evalScheem(expr[i], env);
        // Quote
        case 'quote':
            argumentSize('quote', 1, expr.slice(1).length);
            return expr[1];
        // List manipulators
        case 'cons':
            argumentSize('cons', 2, expr.slice(1).length);
            return [evalScheem(expr[1], env)].concat(
                    evalScheem(expr[2], env));
        case 'car':
            argumentSize('car', 1, expr.slice(1).length);
            return evalScheem(expr[1], env)[0];
        case 'cdr':
            argumentSize('cdr', 1, expr.slice(1).length);
            return evalScheem(expr[1], env).slice(1);
        // Set variables
        case 'define':
            argumentSize('define', 2, expr.slice(1).length);
            env[expr[1]] = evalScheem(expr[2], env);
            return 0;
        case 'set!':
            argumentSize('set!', 2, expr.slice(1).length);
            env[expr[1]] = evalScheem(expr[2], env);
            return 0;
        // Math operations
        case '+':
            argumentSize('+', 2, expr.slice(1).length);
            return evalScheem(expr[1], env) + evalScheem(expr[2], env);
        case '-':
            argumentSize('-', 2, expr.slice(1).length);
            return evalScheem(expr[1], env) - evalScheem(expr[2], env);
        case '*':
            argumentSize('*', 2, expr.slice(1).length);
            return evalScheem(expr[1], env) * evalScheem(expr[2], env);
        case '/':
            argumentSize('/', 2, expr.slice(1).length);
            return evalScheem(expr[1], env) / evalScheem(expr[2], env);
        // Compairors
        case '=':
            argumentSize('=', 2, expr.slice(1).length);
            var eq =
                (evalScheem(expr[1], env) ===
                 evalScheem(expr[2], env));
            if (eq) return '#t';
            return '#f';
        case "<":
            argumentSize('<', 2, expr.slice(1).length);
            var lt =
                (evalScheem(expr[1], env) <
                 evalScheem(expr[2], env));
            if (lt) return '#t';
            return '#f';
        case "<=":
            argumentSize('<=', 2, expr.slice(1).length);
            var lte =
                (evalScheem(expr[1], env) <=
                 evalScheem(expr[2], env));
            if (lte) return '#t';
            return '#f';
        case ">":
            argumentSize('>', 2, expr.slice(1).length);
            var gt =
                (evalScheem(expr[1], env) >
                 evalScheem(expr[2], env));
            if (gt) return '#t';
            return '#f';
        case ">=":
            argumentSize('>=', 2, expr.slice(1).length);
            var gt =
                (evalScheem(expr[1], env) >=
                 evalScheem(expr[2], env));
            if (gte) return '#t';
            return '#f';
        // Simple if statement
        case 'if':
            argumentSize('if', 3, expr.slice(1).length);
            if(evalScheem(expr[1], env) === '#t') {
                return evalScheem(expr[2], env);
            } else {
                return evalScheem(expr[3], env);
            }
    }
};
