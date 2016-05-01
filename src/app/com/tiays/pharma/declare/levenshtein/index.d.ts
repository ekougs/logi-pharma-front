declare module "levenshtein" {
    module levenshtein {
        interface LevenshteinStatic {
            get(str1:String, str2:String):number;
        }
    }

    let levenshtein: levenshtein.LevenshteinStatic;
    export = levenshtein;
}