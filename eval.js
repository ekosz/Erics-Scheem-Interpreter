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
            return expr[1];
        // List manipulators
        case 'cons':
            return [evalScheem(expr[1], env)].concat(
                    evalScheem(expr[2], env));
        case 'car':
            return evalScheem(expr[1], env)[0];
        case 'cdr':
            return evalScheem(expr[1], env).slice(1);
        // Set variables
        case 'define':
            env[expr[1]] = evalScheem(expr[2], env);
            return 0;
        case 'set!':
            env[expr[1]] = evalScheem(expr[2], env);
            return 0;
        // Math operations
        case '+':
            return evalScheem(expr[1], env) + evalScheem(expr[2], env);
        case '-':
            return evalScheem(expr[1], env) - evalScheem(expr[2], env);
        case '*':
            return evalScheem(expr[1], env) * evalScheem(expr[2], env);
        case '/':
            return evalScheem(expr[1], env) / evalScheem(expr[2], env);
        // Compairors
        case '=':
            var eq =
                (evalScheem(expr[1], env) ===
                 evalScheem(expr[2], env));
            if (eq) return '#t';
            return '#f';
        case "<":
            var lt =
                (evalScheem(expr[1], env) <
                 evalScheem(expr[2], env));
            if (lt) return '#t';
            return '#f';
        case "<=":
            var lte =
                (evalScheem(expr[1], env) <=
                 evalScheem(expr[2], env));
            if (lte) return '#t';
            return '#f';
        case ">":
            var gt =
                (evalScheem(expr[1], env) >
                 evalScheem(expr[2], env));
            if (gt) return '#t';
            return '#f';
        case ">=":
            var gt =
                (evalScheem(expr[1], env) >=
                 evalScheem(expr[2], env));
            if (gte) return '#t';
            return '#f';
        case 'if':
            if(evalScheem(expr[1], env) === '#t') {
                return evalScheem(expr[2], env);
            } else {
                return evalScheem(expr[3], env);
            }
    }
};
