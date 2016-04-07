declare module "levenshtein" {
    export = levenshtein;

    var levenshtein: levenshtein.LevenshteinStatic
    module levenshtein {
        interface LevenshteinStatic {
            get(str1:String, str2:String):number;
        }
    }
}