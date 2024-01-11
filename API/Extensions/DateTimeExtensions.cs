namespace API.Extensions;

public static class DateTimeExtensions
{
    public static int CalculateAge(this DateOnly dateOnlyBirthday)
    {
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var age = today.Year - dateOnlyBirthday.Year;

        if (dateOnlyBirthday > today.AddYears(-age)) age--;

        return age;
    }
}